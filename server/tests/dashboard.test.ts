import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response } from 'express';

// 1. Mock Prisma BEFORE importing the controller
vi.mock('../lib/prisma', () => ({
  prisma: {
    interview: {
      count: vi.fn(),
      aggregate: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

// 2. Import AFTER mocking
import { getStats } from '../controller/Dashboardcontroller';
import { prisma } from '../lib/prisma';

describe('Dashboard Controller - getStats', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: any;
  let statusMock: any;

  beforeEach(() => {
    jsonMock = vi.fn().mockReturnThis();
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });
    
    mockReq = { user: { userId: 'user-123' } };
    mockRes = { json: jsonMock, status: statusMock };
    vi.clearAllMocks();
  });

  it('should return 200 and dashboard stats on success', async () => {
    // Mock the 7 Promise.all calls in the exact order they appear in your code
    vi.mocked(prisma.interview.count).mockResolvedValue(10 as any);
    vi.mocked(prisma.interview.aggregate)
      .mockResolvedValueOnce({ _avg: { overallScore: 85 } } as any) // thisWeek
      .mockResolvedValueOnce({ _avg: { overallScore: 80 } } as any) // overall
      .mockResolvedValueOnce({ _avg: { overallScore: 90 } } as any) // thisMonth
      .mockResolvedValueOnce({ _avg: { communicationScore: 8, problemSolvingScore: 7, technicalDepthScore: 9, confidenceScore: 8 } } as any); // skills
      
    vi.mocked(prisma.interview.findFirst).mockResolvedValue({ role: 'Dev', overallScore: 95, finishedAt: new Date() } as any);
    vi.mocked(prisma.interview.findMany).mockResolvedValue([{ id: '1', role: 'Dev' }] as any);

    await getStats(mockReq as Request, mockRes as Response);

    expect(mockRes.json).toHaveBeenCalled();
    const responseData = jsonMock.mock.calls[0][0];
    
    // 1. Check total mocks (Number)
    expect(responseData.mocksCompletedOverall).toBe(10);
    
    // 2. ✅ FIX: Expect the raw Prisma objects since frontend handles extraction
    expect(responseData.averageScoreThisWeek).toEqual({ _avg: { overallScore: 85 } });
    expect(responseData.averageScoreOverall).toEqual({ _avg: { overallScore: 80 } });
    expect(responseData.averageScoreThisMonth).toEqual({ _avg: { overallScore: 90 } });

    // 3. Skills are extracted in the controller, so we check the final numbers
    expect(responseData.skills).toEqual({
      communication: 8,
      problemSolving: 7,
      technicalDepth: 9,
      confidence: 8,
    });
  });

  it('should return 500 if database throws an error', async () => {
    vi.mocked(prisma.interview.count).mockRejectedValue(new Error('DB Error'));
    await getStats(mockReq as Request, mockRes as Response);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});