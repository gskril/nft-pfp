type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export type State = {
  status: LoadingState
  message?: string
}
