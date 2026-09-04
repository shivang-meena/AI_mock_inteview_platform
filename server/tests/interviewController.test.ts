import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response } from 'express';

// Mock Prisma and Groq BEFORE importing
vi.mock('../lib/prisma', () => ({
  prisma: {
    interview: { create: vi.fn(), findFirst: vi.fn(), update: vi.fn() },
  },
}));
vi.mock('../services/groqService', () => ({
  generateInterviewSummary: vi.fn(),
}));

import { createInterview, getInterview } from '../controller/Interviewcontroller';
import { prisma } from '../lib/prisma';

describe('Interview Controller', () => {
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

  it('should return 400 if role is missing in createInterview', async () => {
    mockReq = { user: { userId: 'user-123' }, body: {} };
    await createInterview(mockReq as Request, mockRes as Response);
    expect(statusMock).toHaveBeenCalledWith(400);
  });

  it('should create interview and return 201', async () => {
    mockReq = { user: { userId: 'user-123' }, body: { role: 'Frontend Dev' } };
    const mockInterview = { id: 'int-1', role: 'Frontend Dev', userId: 'user-123' };
    vi.mocked(prisma.interview.create).mockResolvedValue(mockInterview as any);

    await createInterview(mockReq as Request, mockRes as Response);
    expect(statusMock).toHaveBeenCalledWith(201);
  });

  it('should return 404 if interview not found in getInterview', async () => {
    mockReq = { user: { userId: 'user-123' }, params: { id: 'int-1' } };
    vi.mocked(prisma.interview.findFirst).mockResolvedValue(null as any);

    await getInterview(mockReq as Request, mockRes as Response);
    expect(statusMock).toHaveBeenCalledWith(404);
  });
});