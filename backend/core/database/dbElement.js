module.exports = {
    elements: (function () {
        let d = new Date()
        return {
            creatorId: '',
            createDate: d,
            createMonth: d.getMonth(),
            createYear: d.getFullYear(),
            version: 'v2',
            updateDate: '',
            updateHistory: {},

            deleteDate: '',
            deletedByUserId: '',
            updated: false,
            status: true,
            active: true,
            delete: false,
        }
    })()
}