import { usePathname } from 'next/navigation';
import Link from 'next/link';
import PropTypes from 'prop-types';

export { NavLink };

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

function NavLink({ href, exact, children, ...props }) {
    const pathname = usePathname();
    
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += ' active';
    }

    return (
        <Link href={href} {...props} color={isActive ? '' : 'foreground'}>
            {children}
        </Link>
    );
}