import './App.scss' 
import { Provider } from 'react-redux'
import { store } from '@/common/providers/model/store'
import { AppLayout } from '@/common/layouts/AppLayout'
import { DataTable } from '@/features/data-table/DataTable'

function App() {
  
  return (
    <Provider store={store}>
      <AppLayout>
        <DataTable />
      </AppLayout>
    </Provider>
  )
}

export default App
