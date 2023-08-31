<p align="center">
	<a href="https://hiki.minhle.space/">
		<img src="./preview.png" />
	</a>
	<br />
	<sup class="right">hiki - a dialog will turn into a drawer on small viewport</sup>
</p>

## Preview

Preview the example on https://hiki.minhle.space/

## Quick start

### Uncontrolled

```jsx
import { Dialog } from "@monodyle/hiki"; // not published yet...

function Application() {
  return (
    <Dialog target={({ open }) => <button onClick={open}>Open Dialog</button>}>
      {({ close }) => (
        <div className="content">
          {/* your code goes here */}
        </div>
      )}
    </Dialog>
  )
}
```

### Controlled

```jsx
import { Dialog } from "@monodyle/hiki"; // not published yet...

function Application() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen} target={<button onClick={() => setOpen(true)}>Open Dialog</button>}>
      {({ close }) => (
        <div className="content">
          {/* your code goes here */}
        </div>
      )}
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
