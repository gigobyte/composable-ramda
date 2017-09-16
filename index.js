const R = require('ramda')

const compose = (target={}, composedFns=[], lastCallWasApply=false) => {
    return new Proxy(target, {
        get(target, name) {
            if (name in R) {
                return compose(R[name], composedFns)
            }
        },

        apply(target, that, args) {
            if (lastCallWasApply) {
                return composedFns.reduce((res, [fn, fnArgs]) => fn(...[...fnArgs, res]), args[0])
            }

            return compose(target, [...composedFns, [target, args]], true)
        }
    })
}

const p = compose()

module.exports = p

