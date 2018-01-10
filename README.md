# Clock

Clock is a small widget displaying [decimal time](http://wiki.xxiivv.com/desamber). It also contains automatic reminders to stand, drink and [rest your hands](https://en.wikipedia.org/wiki/Repetitive_strain_injury) — inspired from [workrave](https://en.wikipedia.org/wiki/Workrave).

## Beats

The clock has 6 digits, where their overall value is a ratio over the completion of the day. For example, Noon is 500, 6AM is 250 and 6PM is 750.

In the 000:000 format, the shortest pulse equals to 8.64 milliseconds, the second shortest 86.4 and so on. 

## Reminders

Each break lasts 1 beat, or 1000 pulses, is equivalent to 86.4 seconds or about 1m44s.

<img src='https://raw.githubusercontent.com/hundredrabbits/Clock/master/PREVIEW.png' style='max-width: 50%;border-radius: 4px;'/>

## Build

Install [npm](https://docs.npmjs.com/getting-started/installing-node), download dependencies and start Clock with:

```
npm install
npm start
```

## Build

```
npm run build
```

## Notes

During render, the track time is displayed in the before-last row of the Editor in the `0252` format, or 2:52.

## Extras

- Support this project through [Patreon](https://patreon.com/100).
- See the [License](LICENSE.md) file for license rights and limitations (MIT).
