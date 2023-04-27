'use client'

import { VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const variants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'relative',
    'cursor-pointer',
    'disabled:cursor-not-allowed',
    'tracking-wide',
    'transition',
    'outline-none',
    'ring-indigo-500/70',
    'ring-offset-2',
    'focus-visible:ring-2',
    'focus:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'font-semibold',
          'bg-indigo-500',
          'hover:bg-indigo-600',
          'text-white',
          'rounded-full',
          'shadow',
          'hover:shadow-md',
          'disabled:bg-indigo-500/50',
          'disabled:shadow',
        ],
        secondary: [
          'font-normal',
          'bg-gray-50',
          'hover:bg-gray-100',
          'disabled:bg-gray-50',
          'text-gray-950',
          'rounded-full',
          'shadow',
          'border',
          'border-neutral-200/50',
        ],
        destructive: [
          'font-semibold',
          'bg-red-500',
          'hover:bg-red-600',
          'text-white',
          'rounded-full',
          'shadow',
          'hover:shadow-md',
          'disabled:bg-red-500/50',
          'disabled:shadow',
        ],
        ghost: [
          'font-light',
          'text-gray-950',
          'hover:text-gray-600',
          'disabled:text-gray-950',
        ],
        link: [
          'font-light',
          'text-indigo-500',
          'hover:text-indigo-600',
          'disabled:text-indigo-500/50',
          'disabled:no-underline',
          'hover:underline',
        ],
      },
      size: {
        small: ['text-sm', 'py-1', 'px-4'],
        default: ['text-base', 'py-2', 'px-8'],
        large: ['text-lg', 'py-3', 'px-12'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

const loading = cva(['absolute', 'inline-flex', 'items-center'], {
  variants: {
    variant: {
      primary: ['border-white'],
      secondary: ['border-gray-950'],
      destructive: ['border-white'],
      ghost: ['border-gray-950'],
      link: ['border-indigo-500'],
    },
  },
})

const Loading = ({ variant }: VariantProps<typeof loading>) => (
  <div className={loading({ variant })}>
    <div className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit]" />
  </div>
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> & {
    loading?: boolean
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, loading, ...rest }, ref) => (
    <button
      ref={ref}
      className={twMerge(clsx(variants({ variant, size, className })))}
      {...rest}
    >
      {loading && <Loading variant={variant} />}
      <span
        className={clsx('transition', {
          'opacity-0': loading,
          'opacity-100': !loading,
        })}
      >
        {children}
      </span>
    </button>
  )
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
