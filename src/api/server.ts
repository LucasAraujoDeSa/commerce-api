import {app} from './app'

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`server on 🚀, ${process.env.NODE_ENV}`)
})



