import React from 'react'

type Props = {
    onLogin: (name: string) => void;
};

type State = {
    name: string;
};

export class LoginForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        name: "",
    };

    public handleSubmit(event: React.FormEvent): void {
        event.preventDefault();

        this.props.onLogin(this.state.name)
    }

    render() {
        return ( 
        <div className="position-absolute top-50 start-50 translate-middle card text-center p-4">
            <h1>Arena.io</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group mb-2">
                    <input 
                        id="name"
                        type="text" 
                        aria-describedby="nameHelp"
                        className="form-control form-control-lg"
                        placeholder="Nickname" 
                        pattern="[a-zA-Z0-9]{0,20}"
                        maxLength={20}
                        value={this.state.name}
                        onChange={e => this.setState({name: e.currentTarget.value})}
                        autoFocus/>
                    <div id="nameHelp" className="form-text">Only letters or digits up to 20 characters.</div>
                </div>
        
                <button type="submit" className="btn btn-lg btn-primary text-uppercase w-100 ls-2">Play</button>
            </form>
      </div>
      );
    }
  }
