import { ChevronDown, Lock, ThumbsUp, Share2, MoreVertical } from 'lucide-react';

export default function IssueDetails() {
  return (
    <aside className="w-80 bg-white border-l border-border overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-white">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-secondary text-foreground text-sm font-semibold rounded hover:bg-gray-300 transition-colors duration-200 flex items-center gap-2 shadow-sm">
            To Do
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-secondary rounded transition-colors duration-200">
            <Lock className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-1.5 hover:bg-secondary rounded transition-colors duration-200 flex items-center justify-center">
            <span className="text-sm font-semibold text-foreground">1</span>
          </button>
          <button className="p-1.5 hover:bg-secondary rounded transition-colors duration-200">
            <ThumbsUp className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-1.5 hover:bg-secondary rounded transition-colors duration-200">
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-1.5 hover:bg-secondary rounded transition-colors duration-200">
            <MoreVertical className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-6 py-6 space-y-8">
        <div>
          <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">Details</h3>
          
          <div className="space-y-6">
            {/* Assignee */}
            <DetailItem label="Assignee">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-700">
                  U
                </div>
                <span className="text-sm text-foreground">Unassigned</span>
              </div>
              <a href="#" className="text-sm text-primary hover:underline font-medium">Assign to me</a>
            </DetailItem>

            {/* Labels */}
            <DetailItem label="Labels">
              <span className="text-sm text-muted-foreground">None</span>
            </DetailItem>

            {/* Reporter */}
            <DetailItem label="Reporter">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  JT
                </div>
                <span className="text-sm text-foreground font-medium">Jira Templates</span>
              </div>
            </DetailItem>

            {/* Automation */}
            <DetailItem label="Automation">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs">⚡</span>
                </div>
                <span className="text-sm text-muted-foreground">Rule executi...</span>
              </div>
              <button className="text-sm text-primary hover:underline font-medium">Configure</button>
            </DetailItem>
          </div>
        </div>

        {/* Metadata */}
        <div className="text-xs text-muted-foreground space-y-1.5 pt-4 border-t border-border">
          <p>Created 28 minutes ago</p>
          <p>Updated 18 minutes ago</p>
        </div>
      </div>
    </aside>
  );
}

function DetailItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground mb-2.5 uppercase tracking-wide">{label}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}
