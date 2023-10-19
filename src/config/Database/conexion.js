import { connect } from 'mongoose'
import { config } from 'dotenv'
config()
export const connectDB = async () => {
  try {
    console.log('[Database] Connecting...'.magenta.bold)
    await connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('[Database] Connected'.magenta.bold)
  } catch (error) {
    console.log(error)
  }
}
