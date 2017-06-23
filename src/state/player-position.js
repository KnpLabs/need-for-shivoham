export function playerPosition(action, currentPosition) {
    const minX = 64;
    const maxX = 504;
    const trackWidth = 40;

    return Math.max(Math.min(maxX, currentPosition + action * trackWidth), minX);
}

