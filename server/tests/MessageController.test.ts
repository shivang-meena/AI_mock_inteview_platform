import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response } from 'express';

vi.mock('../lib/prisma', () => ({
  prisma: {
    interview: { findFirst: vi.fn() },
    message: { create: vi.fn() },
  },
}));
vi.mock('../services/groqService', () => ({
  generateAIReply: vi.fn(),
}));

import { sendMessage } from '../controller/Messagecontroller';
import { prisma } from '../lib/prisma';
import { generateAIReply } from '../services/groqService';

describe('Message Controller - sendMessage', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: any;
  let statusMock: any;

  beforeEach(() => {
    jsonMock = vi.fn().mockReturnThis();
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });
    mockRes = { json: jsonMock, status: statusMock };
    vi.clearAllMocks();
  });

  it('should return 400 if content is missing', async () => {
    mockReq = { user: { userId: '1' }, params: { id: '1' }, body: {} };
    await sendMessage(mockReq as Request, mockRes as Response);
    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it('should return 404 if interview is not found', async () => {
    mockReq = { user: { userId: '1' }, params: { id: '1' }, body: { content: 'Hello' } };
    vi.mocked(prisma.interview.findFirst).mockResolvedValue(null as any);
    await sendMessage(mockReq as Request, mockRes as Response);
    expect(statusMock).toHaveBeenCalledWith(404);
  });

  it('should create messages and return 201', async () => {
    mockReq = { user: { userId: '1' }, params: { id: 'int-1' }, body: { content: 'Hello AI' } };
    const mockInterview = { id: 'int-1', messages: [] };
    
    vi.mocked(prisma.interview.findFirst).mockResolvedValue(mockInterview as any);
    vi.mocked(prisma.message.create)
      .mockResolvedValueOnce({ id: '1', role: 'USER', content: 'Hello AI' } as any)
      .mockResolvedValueOnce({ id: '2', role: 'ASSISTANT', content: 'Hi!' } as any);
    vi.mocked(generateAIReply).mockResolvedValue('Hi!');

    await sendMessage(mockReq as Request, mockRes as Response);
    expect(statusMock).toHaveBeenCalledWith(201);
    expect(generateAIReply).toHaveBeenCalled();
  });
});