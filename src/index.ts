import { feneValue } from 'fene'
import { range } from 'illa/ArrayUtil'
import { Loop, MembraneSynth, MetalSynth, Synth, Transport } from 'tone'

main()

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const octaves = range(1, 6)
const allNotes = octaves.flatMap(octave => notes.map(note => note + octave))
const totalNotes = allNotes.length

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
		new MetalSynth({
			harmonicity: 99,
			octaves: 0.5,
		}).toMaster(),
		new MembraneSynth({}).toMaster(),
	]

	let index = 0
	const loop = new Loop(time => {
		index++
		if (
			index >= 24 &&
			(feneValue(2, index) && feneValue(32, index)
				? index % 4 == 0
				: index % 8 == 0)
		) {
			synths[
				feneValue(2, index) && feneValue(4, index) ? 3 : 4
			].triggerAttackRelease(allNotes[20], 0.1)
		}
		if (
			feneValue(2, index) && feneValue(32, index)
				? index % 1 == 0
				: index % 2 == 0
		) {
			synths[4].triggerAttackRelease(allNotes[10], 0.5)
		}
		if (
			index >= 24 &&
			!(feneValue(1, index) && feneValue(2, index) && feneValue(3, index))
		) {
			let value = totalNotes / 3
			if (feneValue(1, index)) value += 1
			if (feneValue(6, index)) value *= 0.8
			if (feneValue(12, index)) value += 3
			if (feneValue(18, index)) value -= 4
			if (feneValue(36, index)) value += 5
			if (feneValue(38, index)) value -= 6
			if (feneValue(72, index)) value += 7
			if (feneValue(128, index)) value -= 8
			if (feneValue(312, index)) value *= 1.2
			const noteIndex = Math.max(
				0,
				Math.min(totalNotes - 1, Math.round(value)),
			)
			let instrument = 0
			if (feneValue(1, index)) instrument += 1
			if (feneValue(16, index)) instrument += 1
			synths[instrument].triggerAttackRelease(
				allNotes[noteIndex],
				feneValue(3, index) && feneValue(5, index) ? 0.5 : 0.25,
			)
		}
	}, 0.25)
	loop.start(0)
	Transport.start()
}

document.addEventListener('click', () => Transport.start())
