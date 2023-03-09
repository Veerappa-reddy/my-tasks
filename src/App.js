import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    tasksList: [],
    task: '',
    selectTag: tagsList[0].displayText,
    activeTag: '',
  }

  addTask = event => {
    event.preventDefault()

    const {task, selectTag} = this.state
    const item = {
      id: uuid(),
      task,
      selectTag,
    }
    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, item],
      task: '',
      selectTag: '',
    }))
  }

  noTasks = () => (
    <div className="no-task-container">
      <p>No Tasks Added Yet</p>
    </div>
  )

  tasksContainer = () => {
    const {tasksList} = this.state

    return (
      <ul>
        {tasksList.map(each => (
          <TaskItem each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  changeTask = event => {
    this.setState({task: event.target.value})
  }

  changeTag = event => {
    this.setState({selectTag: event.target.value})
  }

  selectTagItems = tag => {
    const {tasksList} = this.state

    const filteredList = tasksList.filter(each => each.selectTag === tag)
    this.setState({tasksList: filteredList, activeTag: tag})
  }

  render() {
    const {tasksList, activeTag} = this.state

    return (
      <div className="app-bg-container">
        <div className="create-task-container">
          <form className="form-container" onSubmit={this.addTask}>
            <h1 className="create-task-heading">Create a task!</h1>
            <div className="task-container">
              <label htmlFor="task" className="task">
                Task
              </label>
              <input
                type="text"
                placeholder="Enter the task here"
                id="task"
                className="task-input"
                onChange={this.changeTask}
              />
            </div>
            <div className="task-container">
              <label htmlFor="tags" className="task">
                Tags
              </label>
              <select
                id="tags"
                className="task-input"
                onChange={this.changeTag}
              >
                {tagsList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="add-task-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="tags-tasks-container">
          <div className="tags-container">
            <h1 className="tag-heading">Tags</h1>
            <ul className="tags-list-container">
              {tagsList.map(each => (
                <TagItem
                  each={each}
                  key={each.optionId}
                  selectTag={this.selectTagItems}
                  isActive={each.displayText === activeTag}
                />
              ))}
            </ul>
          </div>
          <div className="tasks-container">
            <h1 className="tag-heading">Tasks</h1>
            {tasksList.length > 0 ? this.tasksContainer() : this.noTasks()}
          </div>
        </div>
      </div>
    )
  }
}

export default App

const TaskItem = props => {
  const {each} = props
  const {task, selectTag} = each
  return (
    <li className="task-li-item">
      <p className="item-name">{task}</p>
      <button type="button" className="item-tag">
        {selectTag}
      </button>
    </li>
  )
}

const TagItem = props => {
  const {each, selectTag, isActive} = props
  const {displayText} = each

  const clickTag = () => {
    selectTag(displayText)
  }

  const activeBtn = isActive ? 'active-button' : 'tag-button'

  return (
    <li className="tag-li-item">
      <button type="button" onClick={clickTag} className={activeBtn}>
        <p>{displayText}</p>
      </button>
    </li>
  )
}
