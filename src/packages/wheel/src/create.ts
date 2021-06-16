import {
  createClassNamespace,
  createComponentNamespace
} from '../../shared/create'

const createClassname = createClassNamespace('wheel')

const createWheel = createComponentNamespace('wheel')

const createWheelOption = createComponentNamespace('wheel-option')

export { createClassname, createWheel, createWheelOption }
