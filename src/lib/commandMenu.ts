export const COMMAND_EVENT = 'pec:open-command'
export const openCommandMenu = () => window.dispatchEvent(new Event(COMMAND_EVENT))
