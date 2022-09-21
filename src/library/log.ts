export default class log {
  public static success = (args: any) =>
    console.log(
      '\x1b[36m%s\x1b[0m',
      `${new Date().toLocaleString()} [INFO]`,
      typeof args === 'string' ? args : args
    )

  public static warning = (args: any) =>
    console.log(
      '\x1b[33m%s\x1b[0m',
      `${new Date().toLocaleString()} [INFO]`,
      typeof args === 'string' ? args : args
    )

  public static error = (args: any) =>
    console.log(
      '\x1b[31m',
      `${new Date().toLocaleString()} [INFO]`,
      typeof args === 'string' ? args : args
    )
}
