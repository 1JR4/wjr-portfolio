import React from "react";
import { ExternalLink, Github, TrendingUp, TrendingDown, Minus, Target, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface KPI {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}

interface OKR {
  objective: string;
  keyResults: string[];
  progress: number; // 0-100
}

interface ProductModalSidebarProps {
  status: "live" | "development" | "concept";
  technologies: string[];
  kpis: KPI[];
  okrs: OKR[];
  link?: string;
  github?: string;
  resources: {
    title: string;
    url: string;
    type: "documentation" | "demo" | "research";
  }[];
  className?: string;
}

export function ProductModalSidebar({
  status,
  technologies,
  kpis,
  okrs,
  link,
  github,
  resources,
  className
}: ProductModalSidebarProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "live":
        return { 
          variant: "success" as const, 
          icon: "🟢", 
          label: "Live"
        };
      case "development":
        return { 
          variant: "info" as const, 
          icon: "🔵", 
          label: "In Development"
        };
      case "concept":
        return { 
          variant: "warning" as const, 
          icon: "🟡", 
          label: "Concept"
        };
      default:
        return { 
          variant: "glass" as const, 
          icon: "⚪", 
          label: status
        };
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "demo":
        return "🎯";
      case "research":
        return "📊";
      default:
        return "📖";
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Status Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Status</h3>
        <Badge variant={statusConfig.variant} className="text-sm">
          <span className="mr-2">{statusConfig.icon}</span>
          {statusConfig.label}
        </Badge>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="glass" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* KPIs Section */}
      {kpis.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Key Metrics</h3>
          <div className="space-y-3">
            {kpis.map((kpi, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-white/80 text-sm">{kpi.label}</span>
                  {getTrendIcon(kpi.trend)}
                </div>
                <div className="text-white font-semibold">{kpi.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OKRs Section */}
      {okrs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Objectives</h3>
          <div className="space-y-4">
            {okrs.map((okr, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start gap-2 mb-3">
                  <Target className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-2">{okr.objective}</h4>
                    <div className="space-y-1">
                      {okr.keyResults.map((kr, krIndex) => (
                        <div key={krIndex} className="flex items-start gap-2 text-sm text-white/70">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{kr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-white/60">
                    <span>Progress</span>
                    <span>{okr.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${okr.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Links Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Links</h3>
        <div className="space-y-2">
          {link && (
            <Button
              variant="gradient"
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live
              </a>
            </Button>
          )}
          
          {github && (
            <Button
              variant="glass"
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Resources Section */}
      {resources.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
          <div className="space-y-2">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20"
              >
                <span className="text-lg">{getResourceIcon(resource.type)}</span>
                <span className="text-white/80 text-sm hover:text-white">
                  {resource.title}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}