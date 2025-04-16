export interface Protocol {
  id?: string;
  name: string;
  description: string;
  features: string;
  tags: string;
  githubUrl: string;
  createdBy: string;
  contactEmail: string;
  websiteLink: string;
  logoUrl?: string;
  status?: string;
  createdAt?: string;
}

export type ProtocolFormData = Omit<Protocol, 'id' | 'createdAt' | 'status'>; 