/**
 * TypeScript interfaces for agent handoff contexts
 * Ensures consistent communication between specialized agents
 */

export interface BaseAgentContext {
  sessionId: string;
  timestamp: string;
  agentType: string;
  taskStatus: 'started' | 'in-progress' | 'completed' | 'blocked';
  blockers?: string[];
  nextSteps: string[];
}

export interface BackendContext extends BaseAgentContext {
  agentType: 'backend-api';
  currentEndpoints: {
    path: string;
    method: string;
    status: 'active' | 'deprecated' | 'planned';
  }[];
  databaseSchema: Record<string, any>;
  authStrategy: 'jwt' | 'oauth' | 'firebase-auth' | 'custom';
  performanceMetrics: {
    avgResponseTime: number;
    errorRate: number;
    throughput: number;
  };
  recentChanges: string[];
  dependencies: string[];
}

export interface WebContext extends BaseAgentContext {
  agentType: 'frontend-web';
  framework: 'react' | 'vue' | 'svelte' | 'nextjs';
  stateManagement: 'redux' | 'zustand' | 'pinia' | 'context' | 'none';
  routingStrategy: 'react-router' | 'next-router' | 'vue-router';
  apiEndpoints: string[];
  designSystem: {
    name: string;
    version: string;
    components: string[];
  };
  buildStatus: 'passing' | 'failing' | 'building';
  bundleSize: number;
  performanceScore: number;
}

export interface MobileContext extends BaseAgentContext {
  agentType: 'mobile';
  platform: 'react-native' | 'flutter' | 'native-ios' | 'native-android';
  targetPlatforms: ('ios' | 'android')[];
  nativeFeatures: string[];
  appStoreStatus: {
    ios?: 'development' | 'testflight' | 'review' | 'approved';
    android?: 'development' | 'internal' | 'review' | 'published';
  };
  performanceMetrics: {
    startupTime: number;
    memoryUsage: number;
    crashRate: number;
  };
  buildVariants: string[];
}

export interface DatabaseContext extends BaseAgentContext {
  agentType: 'database';
  provider: 'firebase' | 'postgres' | 'mongodb' | 'mysql' | 'sqlite';
  currentSchema: {
    tables: Record<string, any>;
    indexes: string[];
    relationships: string[];
  };
  pendingMigrations: {
    id: string;
    description: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
  }[];
  queryPerformance: {
    slowQueries: string[];
    avgQueryTime: number;
    connectionPoolSize: number;
  };
  backupStrategy: string;
  dataVolume: number;
}

export interface DevOpsContext extends BaseAgentContext {
  agentType: 'devops';
  deploymentStatus: {
    staging: 'deployed' | 'deploying' | 'failed' | 'pending';
    production: 'deployed' | 'deploying' | 'failed' | 'pending';
  };
  environmentHealth: Record<string, 'healthy' | 'degraded' | 'down'>;
  monitoringAlerts: {
    level: 'info' | 'warning' | 'error' | 'critical';
    message: string;
    timestamp: string;
  }[];
  securityScans: {
    lastRun: string;
    vulnerabilities: number;
    status: 'passed' | 'failed' | 'warnings';
  };
  infrastructureState: {
    services: Record<string, 'running' | 'stopped' | 'error'>;
    resources: Record<string, number>;
  };
}

export interface TestingContext extends BaseAgentContext {
  agentType: 'testing';
  coverageMetrics: {
    lines: number;
    functions: number;
    branches: number;
    statements: number;
  };
  failingTests: {
    suite: string;
    test: string;
    reason: string;
  }[];
  testDataStrategy: 'fixtures' | 'factories' | 'generated' | 'production-copy';
  e2eScenarios: {
    name: string;
    status: 'passing' | 'failing' | 'skipped';
    lastRun: string;
  }[];
  performanceBaselines: Record<string, number>;
  testEnvironments: string[];
}

export interface SecurityContext extends BaseAgentContext {
  agentType: 'security';
  authFlows: {
    type: string;
    status: 'implemented' | 'planned' | 'deprecated';
    securityLevel: 'basic' | 'enhanced' | 'enterprise';
  }[];
  vulnerabilities: {
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    status: 'open' | 'investigating' | 'fixed' | 'accepted';
  }[];
  complianceStatus: Record<string, 'compliant' | 'non-compliant' | 'unknown'>;
  securityHeaders: Record<string, string>;
  auditFindings: {
    category: string;
    severity: string;
    description: string;
    remediation: string;
  }[];
}

export interface UIContext extends BaseAgentContext {
  agentType: 'ui-ux';
  designSystem: {
    name: string;
    version: string;
    tokens: Record<string, any>;
  };
  componentLibrary: {
    name: string;
    version: string;
    components: {
      name: string;
      status: 'stable' | 'beta' | 'deprecated';
      variants: string[];
    }[];
  };
  accessibilityAudit: {
    score: number;
    issues: string[];
    lastAudit: string;
  };
  userFlows: {
    name: string;
    status: 'designed' | 'implemented' | 'tested';
    steps: number;
  }[];
  performanceImpact: {
    bundleIncrease: number;
    renderTime: number;
    layoutShifts: number;
  };
}

// Union type for all contexts
export type AgentContext = 
  | BackendContext 
  | WebContext 
  | MobileContext 
  | DatabaseContext 
  | DevOpsContext 
  | TestingContext 
  | SecurityContext 
  | UIContext;

// Helper functions for context validation
export function validateContext(context: AgentContext): boolean {
  return (
    typeof context.sessionId === 'string' &&
    typeof context.timestamp === 'string' &&
    typeof context.agentType === 'string' &&
    ['started', 'in-progress', 'completed', 'blocked'].includes(context.taskStatus) &&
    Array.isArray(context.nextSteps)
  );
}

export function createBaseContext(agentType: string): BaseAgentContext {
  return {
    sessionId: `session-${Date.now()}`,
    timestamp: new Date().toISOString(),
    agentType,
    taskStatus: 'started',
    nextSteps: []
  };
}