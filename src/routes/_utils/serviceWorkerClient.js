import { snackbar } from '../_components/snackbar/snackbar.js'

async function skipWaiting () {
  const reg = await navigator.serviceWorker.getRegistration()
  if (!reg || !reg.waiting) {
    return
  }
  reg.waiting.postMessage('skip-waiting')
}

function onUpdateFound (registration) {
  const newWorker = registration.installing

  newWorker.addEventListener('statechange', async () => {
    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
      snackbar.announce('intl.updateAvailable', 'intl.reload', async () => {
        await skipWaiting()
        // Slight delay since otherwise Chrome loads infinitely for some reason
        setTimeout(() => {
          document.location.reload(true)
        }, 200)
      })
    }
  })
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(registration => {
    registration.addEventListener('updatefound', () => onUpdateFound(registration))
  })
}
