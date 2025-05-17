'use client'

import { toast } from "sonner"

type ToastType = 'default' | 'success' | 'info' | 'warning' | 'error' | 'loading'

interface ToastOptions {
  id?: string
  description?: string
  duration?: number
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  action?: {
    label: string
    onClick: () => void
  }
  cancel?: {
    label: string
    onClick?: () => void
  }
  onDismiss?: () => void
  onAutoClose?: () => void
}

export function useToast() {
  const showToast = (message: string, type: ToastType = 'default', options?: ToastOptions) => {
    const { id, description, duration, position, action, onDismiss, onAutoClose } = options || {}
    
    switch (type) {
      case 'success':
        return toast.success(message, {
          id,
          description,
          duration,
          position,
          action,
          onDismiss,
          onAutoClose
        })
      case 'info':
        return toast.info(message, {
          id,
          description,
          duration,
          position,
          action,
          onDismiss,
          onAutoClose
        })
      case 'warning':
        return toast.warning(message, {
          id,
          description,
          duration,
          position,
          action,
          onDismiss,
          onAutoClose
        })
      case 'error':
        return toast.error(message, {
          id,
          description,
          duration,
          position,
          action,
          onDismiss,
          onAutoClose
        })
      case 'loading':
        return toast.loading(message, {
          id,
          description,
          duration,
          position,
          onDismiss,
          onAutoClose
        })
      default:
        return toast(message, {
          id,
          description,
          duration,
          position,
          action,
          onDismiss,
          onAutoClose
        })
    }
  }

  return {
    toast: showToast,
    dismiss: toast.dismiss,
    promise: toast.promise,
    custom: toast.custom,
    successToast: (message: string, options?: ToastOptions) => showToast(message, 'success', options),
    errorToast: (message: string, options?: ToastOptions) => showToast(message, 'error', options),
    infoToast: (message: string, options?: ToastOptions) => showToast(message, 'info', options),
    warningToast: (message: string, options?: ToastOptions) => showToast(message, 'warning', options),
    loadingToast: (message: string, options?: ToastOptions) => showToast(message, 'loading', options),
  }
}