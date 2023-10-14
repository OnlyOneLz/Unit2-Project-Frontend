<template>
    <div>
      <button @click="openModal" class="btn btn-primary">Open Modal</button>
  
      <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="messageModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="messageModalLabel">Item removed</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Item has been removed from the basket</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import 'jquery'
  export default {
    name: 'MessageModal',
    methods: {
      // openModal() {
      //   $('#messageModal').modal('show');
      // },
    },
  };
  </script>


  