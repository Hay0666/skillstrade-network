
import { forwardRef } from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';

type ButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnButton>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <ShadcnButton ref={ref} {...props} />;
});

Button.displayName = 'Button';

export default Button;
