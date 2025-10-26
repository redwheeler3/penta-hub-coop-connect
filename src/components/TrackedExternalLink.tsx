import { useAnalytics } from '@/hooks/useAnalytics';

interface TrackedExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  linkName: string;
  linkUrl: string;
}

/**
 * Wrapper component for external links that tracks external link clicks
 * Ensures analytics events are sent before navigation occurs
 */
export const TrackedExternalLink = ({ 
  linkName, 
  linkUrl,
  href,
  children,
  ...props 
}: TrackedExternalLinkProps) => {
  const { trackExternalLink } = useAnalytics();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await trackExternalLink(linkName, linkUrl);
    window.open(href || linkUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <a 
      href={href || linkUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};
