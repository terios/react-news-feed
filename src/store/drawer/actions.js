/**
 * Created by terios on 1/6/17.
 */

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const CLOSE_DRAWER = 'CLOSE_DRAWER'

export const toggleDrawer = (state) => ({
  type: TOGGLE_DRAWER,
  state
})

export const closeDrawer = (name) => ({
  type: CLOSE_DRAWER,
  state
})
