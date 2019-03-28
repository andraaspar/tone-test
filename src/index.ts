import { feneValue } from 'fene'
import { Loop, Synth, Transport } from 'tone'

main()

function main() {
	const synths = [
		new Synth({
			oscillator: {
				type: 'sine',
			},
		}).toMaster(),
		new Synth({
			oscillator: {
				type: 'fmsine',
			},
		}).toMaster(),
		new Synth({
			oscillator: {
				type: 'fmtriangle',
			},
		}).toMaster(),
	]

	let index = 0
	const loop = new Loop(time => {
		index++
		if (feneValue(4, index) && feneValue(2, index) && feneValue(5, index))
			return
		let value = 261.63
		if (feneValue(1, index)) value *= 1.5
		if (feneValue(2, index)) value /= 2
		if (feneValue(6, index)) value *= 1.5
		if (feneValue(9, index)) value /= 2
		if (feneValue(18, index)) value *= 1.5
		if (feneValue(38, index)) value /= 2
		if (feneValue(72, index)) value *= 1.5
		if (feneValue(128, index)) value /= 2
		if (feneValue(312, index)) value *= 1.1
		const freq = Math.max(32.7, Math.min(880, value))
		let instrument = 0
		if (feneValue(1, index)) instrument += 1
		if (feneValue(16, index)) instrument += 1
		synths[instrument].triggerAttackRelease(
			freq,
			feneValue(3, index) && feneValue(5, index) ? 0.5 : 0.25,
		)
	}, 0.25)
	loop.start(0)
	Transport.start()
}
