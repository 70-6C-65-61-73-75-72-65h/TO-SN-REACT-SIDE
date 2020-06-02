class App extends Component {
    // ...
    render() {
      return (
        <div>
          
          {/* 1. встроенный обработчик событий "компонента DOM" */}
          <button onClick={() => { this.setState({ clicked: true }) }}> Click! </button>
          
          {/* 2. "Кастомное событие" или "действие" */}
          <Sidebar onToggle={(isOpen) => {
            this.setState({ sidebarIsOpen: isOpen })
          }}/>
          
          {/* 3. Коллбэк свойства render */}
          <Route path="/topic/:id" render={({ match }) => ( <div> <h1>{match.params.id}</h1> </div> )} />
        </div>
      )
    }
  }


}












let reducers: Reducer<CombinedState<{
  profilePage: {
      newPostText: any;
      posts: {
          id: number;
          message: string;
          likesCount: number;
      }[];
  };
  dialogsPage: {
      newMessageBody: any;
      dialogs: {
          id: number;
          name: string;
      }[];
      messages: {
          id: number;
          message: string;
      }[];
  };
  sidebar: {};
  usersPage: {
      ...;
  } | {
      ...;
  };
}>, AnyAction>












curl --header "Content-Type: application/json" --request PUT --data "{ \"user_data\": { \"photos\": {\"large\": \"https://image.freepik.com/free-vector/_79416-76.jpg\", \"small\": \"https://pm1.narvii.com/6913/9af1b041b94fa4f6a3dc638243fff7d5d3f83b72r1-600-594v2_00.jpg\"}} }" "http://127.0.0.1:4000/users/42"

