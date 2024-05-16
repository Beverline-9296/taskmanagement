firebase.initializeApp({
        apiKey: "AIzaSyAA2z78xc9rX4LB2LK0zQvRHTFgH5PBT1U",
        authDomain: "to-do-list-1a2c2.firebaseapp.com",
        projectId: "to-do-list-1a2c2",
        storageBucket: "to-do-list-1a2c2.appspot.com",
        messagingSenderId: "375910098351",
        appId: "1:375910098351:web:2041df7da1ee4dd588bb5a",
        measurementId: "G-F1HK1RNZCQ"
      });
const db =firebase.firestore();

//function add task
function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();//trim() method remove any blank spaceafter the input
    if(task !==""){
        db.collection("tasks").add({
            task:task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        taskInput.value ="";
        console.log("Task added.")
    }
}
// Function to render tasks
function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${doc.data().task}</span>
      <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  }
  
  // Real-time listener for tasks
  db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          renderTasks(change.doc);
        }
      });
    });

    
    function deleteTask(id){
      db.collection("tasks").doc(id).delete();
    }
  