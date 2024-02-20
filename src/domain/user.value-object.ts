export class Email {
  private _address: string

  get address(): string {
    return this._address
  }

  constructor(props: { address: string }) {
    if (
      props.address == null ||
      !props.address.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      )
    ) {
      throw new Error("InvalidEmail")
    }
    this._address = props.address
  }
}