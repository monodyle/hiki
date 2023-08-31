<p align="center">
	<a href="https://hiki.minhle.space/">
		<img src="./preview.png" />
	</a>
	<br />
  <hr />
	<sup class="right">hiki - a dialog will turn into a drawer on small viewport</sup>
</p>

## Preview

Preview the example on https://hiki.minhle.space/

## Quick start

```jsx
import { Dialog } from "@monodyle/hiki"; // not published yet...

function Application() {
  return (
    <Dialog target={({ open }) => <button onClick={open}>Open Dialog</button>}>
      <div className="content">
        {({ close }) => (
          {/* Your code here */}
        )}
      </div>
    </Dialog>
  )
}
```

## Development

```
yarn # install dependencies
yarn dev # make it awesome
```

## Author

- [@monodyle](https://github.com/monodyle/) - [Twitter](https://twitter.com/monodyle)

### References

Inspired by [Devon Govett](https://twitter.com/devongovett)

## License

MIT © Monody Le 2023+
