import { Link, LinkProps, useNavigate } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';

interface TrackedLinkProps extends Omit<LinkProps, 'onClick'> {
  trackingName: string;
  trackingLocation: string;
}

/**
 * Wrapper component for internal navigation links that tracks CTA clicks
 * Ensures analytics events are sent before navigation occurs
 */
export const TrackedLink = ({ 
  trackingName, 
  trackingLocation, 
  to,
  children,
  ...props 
}: TrackedLinkProps) => {
  const navigate = useNavigate();
  const { trackCTA } = useAnalytics();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await trackCTA(trackingName, trackingLocation);
    navigate(to as string);
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
