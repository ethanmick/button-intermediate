'use client'

import { mergeRefs } from '@/lib/merge-refs'
import { AriaButtonProps, useButton } from '@react-aria/button'
import { useFocusRing } from '@react-aria/focus'
import { useHover } from '@react-aria/interactions'
import { VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'
import { forwardRef, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { mergeProps } from './merge'

const variants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'relative',
    'cursor-pointer',
    'disabled:cursor-not-allowed',
    'tracking-wide',
    'transition-[background-color,box-shadow,text-color,transform]',
    'duration-200',
    'rounded-full',
    'outline-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'font-semibold',
          'bg-indigo-500',
          'data-[hovered=true]:bg-indigo-600',
          'text-white',
          'shadow',
          'data-[hovered=true]:shadow-md',
          'disabled:bg-indigo-500/50',
          'disabled:shadow',
          'data-[focus-visible]:ring-indigo-500/70',
          'data-[pressed=true]:scale-[0.98]',
          'data-[focus-visible]:ring-2',
          'data-[focus-visible]:ring-offset-2',
        ],
        secondary: [
          'font-normal',
          'bg-gray-50',
          'hover:bg-gray-100',
          'disabled:bg-gray-50',
          'text-gray-950',
          'shadow',
          'border',
          'border-neutral-200/50',
          'data-[focus-visible]:ring-gray-200',
          'data-[pressed=true]:scale-[0.98]',
          'data-[focus-visible]:ring-2',
          'data-[focus-visible]:ring-offset-2',
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
          'data-[focus-visible]:ring-red-500',
          'data-[pressed=true]:scale-[0.98]',
          'data-[focus-visible]:ring-2',
          'data-[focus-visible]:ring-offset-2',
        ],
        ghost: [
          'font-light',
          'text-gray-950',
          'hover:text-gray-600',
          'disabled:text-gray-950',
          'data-[focus-visible]:ring-gray-500/30',
          'data-[focus-visible]:ring-1',
        ],
        link: [
          'font-light',
          'text-indigo-500',
          'hover:text-indigo-600',
          'disabled:text-indigo-500/50',
          'disabled:no-underline',
          'hover:underline',
          'data-[focus-visible]:ring-indigo-500/30',
          'data-[focus-visible]:ring-1',
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
  AriaButtonProps<'button'> &
  VariantProps<typeof variants> & {
    loading?: boolean
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      variant,
      size,
      loading,
      disabled,
      onClick,
      ...rest
    } = props
    const ref = useRef<HTMLButtonElement>(null)
    const { isFocusVisible, focusProps } = useFocusRing()
    const { hoverProps, isHovered } = useHover(props)
    const { buttonProps, isPressed } = useButton(
      {
        ...rest,
        isDisabled: disabled,
      },
      ref
    )

    return (
      <button
        ref={mergeRefs([ref, forwardedRef])}
        className={twMerge(clsx(variants({ variant, size, className })))}
        {...mergeProps(buttonProps, focusProps, hoverProps)}
        data-pressed={isPressed || undefined}
        data-hovered={isHovered || undefined}
        data-focus-visible={isFocusVisible || undefined}
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
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
