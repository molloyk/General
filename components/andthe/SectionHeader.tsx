import { ReactNode } from 'react';

export function SectionHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h2>{title}</h2>
        {description ? <small>{description}</small> : null}
      </div>
      {action}
    </div>
  );
}
