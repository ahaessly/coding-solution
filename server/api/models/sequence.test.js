var sequence = require('./sequence')

test('BQ info should be empty', () => {
    const bqdata = sequence.getDBInfo()

    expect(bqdata.project).toBe('<set-project>')
    expect(bqdata.dataset).toBe('<set-dataset>')
    expect(bqdata.table).toBe('<set-table>')
})

test('BQ info should be set to a, b, c', () => {
    sequence.setDBInfo(project='a', dataset='b', table='c')
    const bqdata = sequence.getDBInfo()
    expect(bqdata.project).toBe('a')
    expect(bqdata.dataset).toBe('b')
    expect(bqdata.table).toBe('c')
})