// App component - represents the whole app
App = React.createClass({

    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    // Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        return {
            tasks: Tasks.find({}).fetch()
        }
    },

    renderTasks() {
        // Get tasks from this.data.tasks
        return this.data.tasks.map((task) => {
            return <Task key = {task._id} task = {task} />;
        });
    },

    // Event Handler
    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        var text = React.findDOMNode(this.refs.textInput).value.trim();

        // Insert new task in collection Tasks
        // Add created date stamp
        Tasks.insert({
            text: text, // text to be inserted
            createdAt: new Date() // current time
        });

        // Clear form
        React.findDOMNode(this.refs.textInput).value = "";
    },

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>

                    <form className="new-task" onSubmit={this.handleSubmit} >
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new tasks" />
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
});