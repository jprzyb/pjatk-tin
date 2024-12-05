package pl.pjatk.s24512.groovy.logs

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class Logger {
    enum LogLevel { INFO, DEBUG, ERROR }

    static LogLevel currentLevel = LogLevel.INFO
    static DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")

    static void log(LogLevel level, String message) {
        if (level.ordinal() >= currentLevel.ordinal()) {
            println "[${level}] ${LocalDateTime.now().format(dateFormatter)} - ${message}"
        }
    }

    static void info(String message) {
        log(LogLevel.INFO, message)
    }

    static void debug(String message) {
        log(LogLevel.DEBUG, message)
    }

    static void error(String message) {
        log(LogLevel.ERROR, message)
    }
}