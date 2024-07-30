class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    buildTree(array) {
      array = [...new Set(array)].sort((a, b) => a - b);
      return this.buildTreeHelper(array, 0, array.length - 1);
    }
  
    buildTreeHelper(array, start, end) {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new Node(array[mid]);
      node.left = this.buildTreeHelper(array, start, mid - 1);
      node.right = this.buildTreeHelper(array, mid + 1, end);
      return node;
    }
  
    insert(value) {
      this.root = this.insertHelper(this.root, value);
    }
  
    insertHelper(node, value) {
      if (node === null) return new Node(value);
      if (value < node.data) node.left = this.insertHelper(node.left, value);
      else if (value > node.data) node.right = this.insertHelper(node.right, value);
      return node;
    }
  
    deleteItem(value) {
      this.root = this.deleteHelper(this.root, value);
    }
  
    deleteHelper(node, value) {
      if (node === null) return node;
      if (value < node.data) {
        node.left = this.deleteHelper(node.left, value);
      } else if (value > node.data) {
        node.right = this.deleteHelper(node.right, value);
      } else {
        if (node.left === null) return node.right;
        else if (node.right === null) return node.left;
  
        node.data = this.findMin(node.right).data;
        node.right = this.deleteHelper(node.right, node.data);
      }
      return node;
    }
  
    findMin(node) {
      let current = node;
      while (current.left !== null) current = current.left;
      return current;
    }
  
    find(value) {
      return this.findHelper(this.root, value);
    }
  
    findHelper(node, value) {
      if (node === null || node.data === value) return node;
      if (value < node.data) return this.findHelper(node.left, value);
      return this.findHelper(node.right, value);
    }
  
    levelOrder(callback) {
      if (!callback) throw new Error("Callback is required");
      const queue = [this.root];
      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
  
    inOrder(callback) {
      if (!callback) throw new Error("Callback is required");
      this.inOrderHelper(this.root, callback);
    }
  
    inOrderHelper(node, callback) {
      if (node === null) return;
      this.inOrderHelper(node.left, callback);
      callback(node);
      this.inOrderHelper(node.right, callback);
    }
  
    preOrder(callback) {
      if (!callback) throw new Error("Callback is required");
      this.preOrderHelper(this.root, callback);
    }
  
    preOrderHelper(node, callback) {
      if (node === null) return;
      callback(node);
      this.preOrderHelper(node.left, callback);
      this.preOrderHelper(node.right, callback);
    }
  
    postOrder(callback) {
      if (!callback) throw new Error("Callback is required");
      this.postOrderHelper(this.root, callback);
    }
  
    postOrderHelper(node, callback) {
      if (node === null) return;
      this.postOrderHelper(node.left, callback);
      this.postOrderHelper(node.right, callback);
      callback(node);
    }
  
    height(node) {
      if (node === null) return -1;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    depth(node) {
      return this.depthHelper(this.root, node, 0);
    }
  
    depthHelper(current, node, depth) {
      if (current === null) return -1;
      if (current === node) return depth;
      const leftDepth = this.depthHelper(current.left, node, depth + 1);
      if (leftDepth !== -1) return leftDepth;
      return this.depthHelper(current.right, node, depth + 1);
    }
  
    isBalanced() {
      return this.isBalancedHelper(this.root);
    }
  
    isBalancedHelper(node) {
      if (node === null) return true;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.abs(leftHeight - rightHeight) <= 1 && this.isBalancedHelper(node.left) && this.isBalancedHelper(node.right);
    }
  
    rebalance() {
      const values = [];
      this.inOrder(node => values.push(node.data));
      this.root = this.buildTree(values);
    }
  }
  
  // Utility function to pretty print the tree
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) return;
    if (node.right !== null) prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  };
  
  // Driver script
  const getRandomArray = (length, max) => Array.from({ length }, () => Math.floor(Math.random() * max));
  
  const randomArray = getRandomArray(15, 100);
  const tree = new Tree(randomArray);
  
  console.log("Tree created with random values:");
  prettyPrint(tree.root);
  
  console.log("\nIs the tree balanced?", tree.isBalanced());
  
  console.log("\nLevel Order Traversal:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("\nPre Order Traversal:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("\nPost Order Traversal:");
  tree.postOrder(node => console.log(node.data));
  
  console.log("\nIn Order Traversal:");
  tree.inOrder(node => console.log(node.data));
  
  // Unbalance the tree
  tree.insert(200);
  tree.insert(300);
  tree.insert(400);
  
  console.log("\nTree after inserting values > 100:");
  prettyPrint(tree.root);
  
  console.log("\nIs the tree balanced?", tree.isBalanced());
  
  // Rebalance the tree
  tree.rebalance();
  
  console.log("\nTree after rebalancing:");
  prettyPrint(tree.root);
  
  console.log("\nIs the tree balanced?", tree.isBalanced());
  
  console.log("\nLevel Order Traversal:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("\nPre Order Traversal:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("\nPost Order Traversal:");
  tree.postOrder(node => console.log(node.data));
  
  console.log("\nIn Order Traversal:");
  tree.inOrder(node => console.log(node.data));
  