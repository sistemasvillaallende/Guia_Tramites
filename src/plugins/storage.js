class storageNIUFLEEX {
    constructor({
        driver = 'local',
        ttl = 0,
        prefix = 'beinfinitus_'
    }) {
        if (driver == 'local' || driver == 'session') {
            this.driver = driver
            if (isNaN(ttl)) {
                this.ttl = 0
            } else {
                this.ttl = ttl
            }
            this.prefix = prefix
        } else {
            throw 'Error Driver'
        }
    }
    set(key, value) {
        let object = JSON.stringify(value)


        if (object) {
            window[`${this.driver}Storage`].setItem(
                `${this.prefix}${key}`,
                JSON.stringify(value)
            )
        } else {
            window[`${this.driver}Storage`].setItem(`${this.prefix}_${key}`, value)
        }
    }
    get(key) {
        try {
            return {
                value: JSON.parse(
                    window[`${this.driver}Storage`].getItem(`${this.prefix}${key}`)
                ),
                key,
                message: ''
            }
        } catch (error) {
            return {
                value: window[`${this.driver}Storage`].getItem(`${this.prefix}${key}`),
                key,
                message: error
            }
        }
    }
    clear() {
        window[`${this.driver}Storage`].clear()
    }
    getObjectValue(key) {
        try {
            return JSON.parse(
                window[`${this.driver}Storage`].getItem(`${this.prefix}${key}`)
            )
        } catch (error) {
            return null
        }
    }
    getTextOrInt(key) {
        try {
            return JSON.parse(
                window[`${this.driver}Storage`].getItem(`${this.prefix}${key}`)
            )
        } catch (error) {
            return ""
        }
    }
    removeKey(key) {
        return window[`${this.driver}Storage`].removeItem(`${this.prefix}${key}`)
    }
}
let storeNiu = new storageNIUFLEEX({
    driver: 'local',
    ttl: 0,
    prefix: 'beinfinitus_'
})
window.storeNiu = storeNiu
export default storeNiu