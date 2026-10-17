import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';

interface PageHeaderProps {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
}

export function PageHeader({ crumbs, eyebrow, title, description, aside }: PageHeaderProps) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="container-page pb-10 pt-6 sm:pb-12 sm:pt-7">
        <Breadcrumbs items={crumbs} />
        <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-4 font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[46px]">
              {title}
            </h1>
            {description ? (
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-muted sm:text-[15px]">
                {description}
              </p>
            ) : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
