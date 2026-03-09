<template>

<div class="min-h-screen bg-gray-100 p-10">

<h2 class="text-2xl font-bold mb-6 text-center">
My Leaves
</h2>

<div v-if="leaves.length === 0" class="text-center text-gray-500">
No leave requests found
</div>

<div
v-for="leave in leaves"
:key="leave._id"
class="bg-white shadow p-4 mb-4 rounded"
>

<p><strong>Type:</strong> {{leave.leaveType}}</p>

<p>
<strong>Dates:</strong>
{{ new Date(leave.startDate).toLocaleDateString() }}
-
{{ new Date(leave.endDate).toLocaleDateString() }}
</p>

<p>
<strong>Status:</strong>
<span
:class="{
'text-yellow-500': leave.status === 'Pending',
'text-green-500': leave.status === 'Approved',
'text-red-500': leave.status === 'Rejected'
}"
>
{{leave.status}}
</span>
</p>

</div>

</div>

</template>

<script>

import axios from "axios"

export default{

data(){
return{
leaves:[]
}
},

async mounted(){

try{

const res = await axios.get(
"http://localhost:5000/api/leave/my-leaves",
{
headers:{
Authorization:"Bearer " + localStorage.getItem("token")
}
}
)

this.leaves = res.data

}catch(err){

console.log(err)
alert("Error loading leaves")

}

}

}

</script>