import React from 'react'

type Props = {
    onLogin: (nick: string) => void;
};

type State = {
    nick: string;
};

export class LoginForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        nick: "",
    };

    public handleSubmit(event: React.FormEvent): void {
        event.preventDefault();

        this.props.onLogin(this.state.nick)
    }

    render() {
        return ( 
        <div className="position-absolute top-50 start-50 translate-middle card text-center p-4">
            <h1>Arena.io</h1>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group mb-2">
                    <input 
                        type="text" 
                        className="form-control form-control-lg"
                        placeholder="Nickname" 
                        value={this.state.nick}
                        onChange={e => this.setState({nick: e.currentTarget.value})}
                        autoFocus/>
                </div>
        
                <button type="submit" className="btn btn-lg btn-primary text-uppercase w-100 ls-2">Play</button>
            </form>
      </div>
      );
    }
  }
