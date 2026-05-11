"use client";

import {
  Link as LinkIcon,
  MoreVertical,
  Edit,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import EditIssueModal from "./EditIssueModal";

export interface IConsult {
  id: string;
  summary: string;
  description: string;
  assignee: string | null;
  labels: string[];
  status: string;
  priority: string;
  creator: string;
  realation: string[];
}

export interface User {
  id: string;
  name: string;
  short: string;
  email: string;
  avatar: string | null;
}

export const Consult: IConsult = {
  id: "412222",
  summary: "Febre alta - docinto muito",
  description: `
# Evolução do paciente

Foi verificado que a criança apresentava:

- Febre alta
- Dor no corpo
- Cansaço excessivo

## Medicamentos prescritos

- Paracetamol
- Dipirona

## Observações

Paciente deverá retornar em caso de piora.
`.trim(),
  assignee: "8000000",
  labels: [],
  status: "Em atendimento",
  priority: "Low",
  creator: "8000000",
  realation: [],
};

export const User: User = {
  id: "121223131313",
  name: "Dr. Maria",
  short: "8000000",
  email: "",
  avatar: null,
};

export default function IssueContent() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <main className="flex-1 bg-background overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a className="hover:text-foreground transition-colors">Prontuario</a>
          <span>/</span>
          <a className="hover:text-foreground transition-colors flex items-center gap-1">
            <span className="w-5 h-5 bg-secondary rounded flex items-center justify-center text-xs font-bold text-foreground">
              MED
            </span>
            Consultas
          </a>
          <span>/</span>
          <span className="text-foreground font-semibold">{Consult.id}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-3 leading-tight">
          {Consult.summary}
        </h1>

        {/* Action Bar */}
        <div className="flex items-center gap-4 py-5 border-b border-border mb-8">

          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded transition-colors">
            <LinkIcon className="w-4 h-4" />
            Relacionar
          </button>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>

          <button className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm font-semibold rounded hover:bg-muted transition-colors flex items-center gap-2">
            {Consult.status}
            <ChevronDown className="w-4 h-4" />
          </button>

          <button className="p-1.5 hover:bg-secondary rounded transition-colors">
            <MoreVertical className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Details */}
        <section className="mb-10 space-y-5">

          {/* Priority */}
          <DetailItem label="Prioridade">
            <div className="flex items-center gap-2 border border-border px-3 py-2 rounded-lg bg-card w-fit">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                Baixa
              </span>
            </div>
          </DetailItem>

          {/* Responsável */}
          <DetailItem label="Responsável">
            <div className="flex items-center gap-3 border border-border px-3 py-2 rounded-lg bg-card w-fit">

              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                DM
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {User.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {User.short}
                </span>
              </div>

            </div>
          </DetailItem>

          {/* Creator */}
          <DetailItem label="Criador">
            <div className="flex items-center gap-3 border border-border px-3 py-2 rounded-lg bg-card w-fit">

              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                DM
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {User.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {User.short}
                </span>
              </div>

            </div>
          </DetailItem>

        </section>

        {/* Description */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-foreground mb-5">
            Description
          </h2>

          <div className="bg-card p-6 rounded-xl border border-border text-sm text-foreground">
            <div className="markdown">
              <ReactMarkdown>
                {Consult.description}
              </ReactMarkdown>
            </div>
          </div>
        </section>

        {/* Activity */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-6">
            Activity
          </h2>

          <div className="flex items-center gap-6 border-b border-border mb-8">
            <button className="px-1 py-3 text-sm font-semibold text-foreground border-b-2 border-primary">
              All
            </button>
            <button className="px-1 py-3 text-sm text-muted-foreground hover:text-foreground">
              Comments
            </button>
            <button className="px-1 py-3 text-sm text-muted-foreground hover:text-foreground">
              History
            </button>
          </div>

          {/* Comment */}
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
              DM
            </div>

            <div className="flex-1">
              <textarea
                placeholder="Add a comment..."
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={4}
              />

              <p className="text-xs text-muted-foreground mt-2 ml-1">
                Pro tip: press{" "}
                <kbd className="bg-muted px-2 py-1 rounded border border-border text-xs">
                  M
                </kbd>{" "}
                to comment
              </p>
            </div>
          </div>
        </section>

        {/* Modal */}
        <EditIssueModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          issue={{
            id: "PO-1",
            summary: "Request",
            description: "",
            assignee: "Unassigned",
            labels: [],
            status: "TO DO",
            priority: "Low",
          }}
        />
      </div>
    </main>
  );
}

function DetailItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide min-w-32 pt-2">
        {label}
      </p>

      <div className="flex-1">{children}</div>
    </div>
  );
}