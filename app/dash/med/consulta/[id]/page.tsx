import IssueContent from '@/components/IssueContent';
import './markdown.css'

export default function Page() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <IssueContent />
    </div>
  );
}
