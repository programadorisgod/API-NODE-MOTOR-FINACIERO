import { connect } from 'mongoose'

export const connectDB = async () => {
  try {
    console.log('[Database] Connecting...'.magenta.bold)
    await connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000
    })
    console.log('[Database] Connected'.magenta.bold)
  } catch (error) {
    console.log(error)
  }
}
