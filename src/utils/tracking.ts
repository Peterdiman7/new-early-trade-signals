function getClickIdFromCookie(): string | null {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=')
        if (name === 'click_id') {
            return value
        }
    }
    return null
}

export function fireTeleFuturePixel(userId: string | number) {
    const clickId = getClickIdFromCookie();

    if (!clickId) {
        console.log('No click_id found, skipping TeleFuture pixel');
        return;
    }

    const pixelUrl =
        "https://tracking.telefuture.com/pixel" +
        `?event=lead` +
        `&click_id=${encodeURIComponent(clickId)}` +
        `&user_id=${encodeURIComponent(userId)}`

    const img = new Image()
    img.src = pixelUrl

    console.log('TeleFuture pixel fired:', pixelUrl)
}

export function fireTeleFuturePixelFetch(userId: string | number) {
    const clickId = getClickIdFromCookie();

    if (!clickId) {
        console.log('No click_id found, skipping TeleFuture pixel')
        return
    }

    const pixelUrl =
        "https://tracking.telefuture.com/pixel" +
        `?event=lead` +
        `&click_id=${encodeURIComponent(clickId)}` +
        `&user_id=${encodeURIComponent(userId)}`

    fetch(pixelUrl, {
        method: 'GET',
        keepalive: true
    }).catch(err => {
        console.error('TeleFuture pixel error:', err)
    })

    console.log('TeleFuture pixel fired:', pixelUrl)
}