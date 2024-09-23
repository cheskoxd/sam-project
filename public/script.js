const baseStyle = `font-family: 'm6x11plus', monospace; font-size: 24px; border: 2px solid #4e342e; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.9);`;

const bags = [[88, 207], [278, 239], [231,95], [43,207], [380, 180]]

class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'menu'
        });
    }
    preload() {
        this.canvas = this.sys.game.canvas;
        this.load.image('menuBackground', 'https://play.rosebud.ai/assets/town.png?rJv1');
        this.load.audio('menuMusic', 'https://play.rosebud.ai/assets/bgMusic.wav.wav?53WM');
    }
    create() {
        // Add background
        let { width, height } = this.canvas
        this.scale.displaySize.setAspectRatio( width/height );
        this.scale.refresh();
        this.add.image(256, 144, 'menuBackground');
        // Play background music
        this.sound.play('menuMusic', {
            loop: true,
            volume: 0.1
        });
        // Add title
        const title = this.add.text(256, 30, 'Granada Green', {
            fontFamily: '"Arial"',
            fontSize: '32px',
            color: '#0000ff',
            align: 'center'
        }).setOrigin(0.5);
        title.setStroke('#000000', 2);
        title.setShadow(2, 2, '#333333', 2, true, true);
        // Add instructions
        const instructions = [
            'How to Play:',
            '1. Use arrow keys to move around the village',
            '2. Explore the village and find trash bags',
            '3. Put the bags on the trash can',
            '4. Use money to buy upgrades to clean faster',
          
            'Enjoy your tour of the Digital Village!'
        ];
        const instructionText = this.add.text(256, 140, instructions, {
            fontFamily: '"Arial"',
            fontSize: '12px',
            color: '#ffff00',
            align: 'center',
            lineSpacing: 6
        }).setOrigin(0.5);
        instructionText.setStroke('#000000', 2);
        instructionText.setShadow(1, 1, '#333333', 1, true, true);
        // Add start button
        const startButton = this.add.text(256, 250, 'Start Game', {
            fontFamily: '"m6x11plus"',
            fontSize: '16px',
            color: '#ffff00',
            align: 'center',
            resolution: 2
           
        }).setOrigin(0.5);
        startButton.setStroke('#000000', 3);
        startButton.setShadow(2, 2, '#333333', 2, true, true);
        startButton.setInteractive({
            useHandCursor: true
        });
        startButton.on('pointerover', () => startButton);
        startButton.on('pointerout', () => startButton);
        startButton.on('pointerdown', () => this.scene.start('game'));
        // Add keyboard listener to start game
        this.input.keyboard.on('keydown', () => this.scene.start('game'));
    }
}

class ChatScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'game',
        });
    }

    preload() {
        this.canvas = this.sys.game.canvas;
        this.load.image('background', 'town.png');
        this.load.image('coin', 'coin.png');
        this.load.image('trash', 'trash.png');
        this.load.image('coins', 'coins.png');
        this.load.image('potion', 'potion.png');
        this.load.image('backpak', 'backpak.png');
        this.load.image('u', 'u.png');
        this.load.image('d', 'd.png');
        this.load.image('r', 'r.png');
        this.load.image('l', 'l.png');
        this.load.spritesheet('sergeant', 'https://play.rosebud.ai/assets/npc1Idle.png?k7NM', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('bag', 'bag.png');
        this.load.image('flag', 'flag.png');
        this.load.spritesheet('chip', 'https://play.rosebud.ai/assets/npc2Idle.png?Zk2y', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('captain', 'https://play.rosebud.ai/assets/npc3Idle.png?ltgk', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('private', 'https://play.rosebud.ai/assets/npc4Idle.png?NfKv', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('player', `person.png`, {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('playerIdle', `idle.png`, {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('tina', 'https://play.rosebud.ai/assets/npc3Idle.png?ltgk', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('ethan', 'https://play.rosebud.ai/assets/npc1Idle.png?k7NM', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('harold', 'https://play.rosebud.ai/assets/npc2Idle.png?Zk2y', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('sam', `https://play.rosebud.ai/assets/npc4Idle.png?NfKv`, {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.audio('dragonTheme', `https://play.rosebud.ai/assets/dragon theme 2.m4a?ZYNz`);
        // Load the custom font using CSS
        const newStyle = document.createElement('style');
        newStyle.textContent = `
            @font-face {
                font-family: "m6x11plus";
                src: url('https://play.rosebud.ai/assets/m6x11plus.ttf?7g5R') format('truetype');
            }
        `;
        document.head.appendChild(newStyle);
        // Ensure the font is loaded before creating text
        this.add.text(0, 0, '', {
            fontFamily: '"m6x11plus"'
        });

        this.input.setDefaultCursor('url(https://play.rosebud.ai/assets/cursor.png?5El2), pointer');
    }

    updateEverything(){
        localStorage.setItem('coinsMult', JSON.stringify(this.coinsMultiplier))
        localStorage.setItem('speedMult', JSON.stringify(this.speedMult))
        localStorage.setItem('invAmount', JSON.stringify(this.INVENTORY_AMOUNT))
        localStorage.setItem('coins', JSON.stringify(this.coins))
        localStorage.setItem('inventory', JSON.stringify(this.inventory))

    }

    create() {
        const fullscreenButton = document.getElementById("fscreen")
        fullscreenButton.style.display = "hidden"
        let { width, height } = this.canvas;
        this.scale.displaySize.setAspectRatio( width / height );
        this.scale.refresh();
        this.coinsMultiplier = localStorage.getItem('coinsMult') ? JSON.parse(localStorage.getItem('coinsMult')) : 1
        this.speedMult = localStorage.getItem('speedMult') ? JSON.parse(localStorage.getItem('speedMult')) : 1
        this.INVENTORY_AMOUNT = localStorage.getItem('invAmount') ? JSON.parse(localStorage.getItem('invAmount')) : 1;
        this.going = ""
        // Add the background image
        this.add.image(256, 144, 'background'); // Center the background image
    
        // Initialize player animations
        this.anims.create({
            key: 'playerWalking',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 20
            }),
            frameRate: 20,
            repeat: -1
        });
    
        this.anims.create({
            key: 'playerIdle',
            frames: this.anims.generateFrameNumbers('playerIdle', {
                start: 0,
                end: 20
            }),
            frameRate: 20,
            repeat: -1
        });
    
        // Initialize the player
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.body.setSize(25, 22);
        this.player.setCollideWorldBounds(true);
        this.player.anims.play('playerIdle', true);
    
        this.colliders = this.physics.add.staticGroup();
        // this.addCollider(34, 144, 93, 63); // mi casa
        // this.addCollider(990, 500, 140, 135); // casa pequeña al derecho
        // this.addCollider(650, 340, 70, 90); // well
        // this.addCollider(895, 310, 110, 30); // fence
        // this.addCollider(10, 530, 280, 175);
        // this.addCollider(630, 650, 360, 160);
        this.physics.add.collider(this.player, this.colliders);
        this.add.sprite(150, 100, 'flag');
    
        // Play the background music
        const dragonTheme = this.sound.add('dragonTheme', {
            volume: 0.1,
            loop: true
        });
        dragonTheme.play();
    
        this.cursors = this.input.keyboard.createCursorKeys();
    
        // Create the inventory array or retrieve it from local storage
        this.inventory = localStorage.getItem('inventory') ? JSON.parse(localStorage.getItem('inventory')) : [];
        this.coins = localStorage.getItem('coins') ? JSON.parse(localStorage.getItem('coins')) : 0; 
         // Fixed text element for inventory
         this.inventoryText = this.add.text(148, 90, this.inventory.length, {
            fontFamily: '"m6x11plus"',
            fontSize: '10px',
            color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 15, y: 5 },
            resolution: 2 // Increase resolution for sharper text
            // fixedWidth: 200
        }).setOrigin(0.5).setDepth(9)
        this.inventoryText.setScrollFactor(0); // Fix to screen
        this.bagIcon = this.add.sprite(135, 90, 'bag').setOrigin(0.5).setScale(0.7).setDepth(9);
        this.bagIcon.setScrollFactor(0)
        this.coinsText = this.add.text(145, 120, this.coins, {
            fontFamily: '"m6x11plus"',
            fontSize: '10px',
            color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 15, y: 5 },
            resolution: 2 // Increase resolution for sharper text
            // fixedWidth: 200
        }).setOrigin(0.5).setDepth(9)
        this.coinsText.setScrollFactor(0); 
        this.coinsIcon = this.add.sprite(135, 121, 'coin').setOrigin(0.5).setDepth(9);
        this.coinsIcon.setScrollFactor(0)
        this.updateInventoryDisplay()
        // Create physics group for bags
        this.placedBags = [];
        this.bagGroup = this.physics.add.group();
    
        // Add a bag every 15 seconds
        this.time.addEvent({
            delay: 8000 - (100 * this.coinsMultiplier) , // 5 seconds
            callback: this.addRandomBag,
            callbackScope: this,
            loop: true
        });
    
        // Proximity checker event to pick up or place bags
        this.time.addEvent({
            delay: 100, // Check proximity every 100ms
            callback: this.checkProximity,
            callbackScope: this,
            loop: true
        });
        const dropZoneX = this.scale.width - 50; // 50px from the right
        const dropZoneY = this.scale.height - 50; // 50px from the top
        const ttt = this.add.sprite(dropZoneX, dropZoneY, 'trash');
        this.dropZone = this.add.rectangle(dropZoneX, dropZoneY, 40, 40, 0x00ff00); // Green square
        // this.dropZone.setStrokeStyle(2, 0xffffff); // White border for visibility
        this.dropZone.setInteractive().setAlpha(0.001);
        
        this.dropZone.setInteractive({ cursor: 'pointer' });

        const shopZoneX = this.scale.width - 60; // Position the shop rectangle
        const shopZoneY = 50;
        this.shopZone = this.add.rectangle(shopZoneX, shopZoneY, 50, 50, 0x0000ff).setAlpha(0.01); // Blue square
        
        // this.shopZone.setStrokeStyle(2, 0xffffff); // White border for visibility
        this.isShopOpen = false
        // Enable the shop rectangle for interaction
        this.shopZone.setInteractive({ cursor: 'pointer' });

        // Listen for click on the shop rectangle to open the shop
        this.shopZone.on('pointerdown', () => {
            this.openShop();
        });
        
        
        this.createControls()

    }
    updateInventoryDisplay() {
        this.inventoryText.setText(`${this.inventory.length}/${this.INVENTORY_AMOUNT}`)
    }
    updateCoinsDisplay() {
        this.coinsText.setText(`${this.coins}`)
    }
    createControls(){
        //120 y
        const up = this.add.sprite(170, this.scale.height - 90, 'd').setDepth(9); // Blue square
        // up.setStrokeStyle(2, 0xffffff); // White border for visibility
        // Enable the shop rectangle for interaction
        up.setInteractive();
        up.setScrollFactor(0)
        // Listen for click on the shop rectangle to open the shop
        up.on('pointerdown', () => {
            this.going = "down"
        });
        up.on('pointerup', () => {
            this.going = ""
        });

        const down = this.add.sprite(170, this.scale.height - 120, 'u').setDepth(9); // Blue square
        // down.setStrokeStyle(2, 0xffffff); // White border for visibility
        // Enable the shop rectangle for interaction
        down.setInteractive();
        down.setScrollFactor(0)
        // Listen for click on the shop rectangle to open the shop
        down.on('pointerdown', () => {
            this.going = "up"
        });
        down.on('pointerup', () => {
            this.going = ""
        });
        const left = this.add.sprite(150, this.scale.height - 105, 'l').setDepth(9); // Blue square
        // left.setStrokeStyle(2, 0xffffff); // White border for visibility
        // Enable the shop rectangle for interaction
        left.setInteractive();
        left.setScrollFactor(0)
        // Listen for click on the shop rectangle to open the shop
        left.on('pointerdown', () => {
            this.going = "left"
        });
        left.on('pointerup', () => {
            this.going = ""
        });

        const right = this.add.sprite(190, this.scale.height - 105,'r').setDepth(9); // Blue square
        // right.setStrokeStyle(2, 0xffffff); // White border for visibility
        // Enable the shop rectangle for interaction
        right.setInteractive();
        right.setScrollFactor(0)
        // Listen for click on the shop rectangle to open the shop
        right.on('pointerdown', () => {
            this.going = "right"
        });
        right.on('pointerup', () => {
            this.going = ""
        });


    }
    checkProximityToDropZone() {
        const distance = Phaser.Math.Distance.Between(
            this.player.x, this.player.y, this.dropZone.x, this.dropZone.y
        );
    
        // If player is within 50px range of the drop zone
        if (distance < 50) {
            this.dropZone.setFillStyle(0xff0000); // Change to red when near
            
            // Add a listener for dropping bags when the player clicks the square
            if (!this.dropZone.hasListener) {
                this.dropZone.hasListener = true; // Ensure listener is added only once
    
                this.dropZone.on('pointerdown', () => {
                    if (this.inventory.length > 0) {
                        // Remove all bags from inventory
                        this.inventory = [];
                        this.updateInventoryDisplay(); // Update inventory UI
                        
                        // Provide feedback to player
                        const droppedText = this.add.text(this.dropZone.x, this.dropZone.y - 20, 'Bags dropped!', {
                            fontFamily: '"m6x11plus"', fontSize: '10px', color: '#ff0000', resolution: 2
                        }).setOrigin(0.5);
    
                        // Remove text after a short delay
                        this.time.delayedCall(1000, () => {
                            droppedText.destroy();
                        });
                    }
                });
            }
        } else {
            this.dropZone.setFillStyle(0x00ff00); // Revert to green when far
        }
    }
    openShop() {
        if (this.isShopOpen) return
        this.isShopOpen = true
        // Get the center of the camera view (player's view)
        let { height, width } = this.scale

        const cameraCenterX = this.cameras.main.width / 2
        const cameraCenterY = this.cameras.main.height / 2

        // let titleText = this.add.text(0, 0, 'Game Menu', {
        //     fontSize: '32px',
        //     fill: '#ffffff'
        // }).setOrigin(0.5);
        // this.cameras.main.ignore(titleText);
        // this.cameras.main.add(titleText);

        // Create a semi-transparent background for the shop screen (full camera view)
        this.shopBackground = this.add.rectangle(
            0, 0,
            this.cameras.main.width, this.cameras.main.height,
            0x000000, 0.5
        ).setOrigin(0).setScrollFactor(0).setDepth(10);

        // Create a larger shop panel (centered on the player's screen)
        const shopPanelWidth = 120;
        const shopPanelHeight = 80;
        this.shopPanel = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, shopPanelWidth, shopPanelHeight, 0xffffff)
            .setStrokeStyle(2, 0x000000) // Green border
            .setScrollFactor(0) // Stick to the camera
            .setDepth(11);

        // Add shop items or text inside the shop panel (adjusted position)
        this.shopText = this.add.text(this.scale.width / 2, cameraCenterY - (shopPanelHeight / 2) + 10, 'Welcome to the Shop!', {
            fontFamily: '"Arial"', fontSize: '6px', color: '#000000', resolution: 2
        }).setOrigin(0.5).setScrollFactor(0).setDepth(12);

        // Add a Close button (adjusted position)
        this.closeButton = this.add.text(cameraCenterX - (shopPanelWidth / 2) + 10, cameraCenterY - (shopPanelHeight / 2) + 5, 'Close', {
            fontFamily: '"Arial"', fontSize: '6px', color: '#ff0000', resolution: 2
        }).setOrigin(0.5).setScrollFactor(0).setDepth(12).setInteractive();
        const spacing = shopPanelWidth / 3;
        const start = cameraCenterX - (shopPanelWidth / 2) + spacing / 2;
        const itemWidth = this.scale.width * 0.1; // Assuming item width is 10% of screen width

        this.back = this.add.sprite(start, cameraCenterY, 'backpak')
            // .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(12)
            .setInteractive()
        this.t1 = this.add.text(start, cameraCenterY - 10, 'More inventory', {
            fontFamily: '"m6x11plus"', fontSize: '6px', color: '#000000', resolution: 2
        }).setScrollFactor(0)
            .setDepth(12).setOrigin(0.5)
        // .setScale(itemWidth / this.add.sprite(0, 0, 'backpak').width); // Scale to match the desired item width
        this.back.on('pointerdown', () => {
            if (this.coins == 0) return 

            this.INVENTORY_AMOUNT = this.INVENTORY_AMOUNT + 1
            this.coins = this.coins - 1
            this.updateEverything()
            this.updateInventoryDisplay()
            this.updateCoinsDisplay()
            // alert("Now you can carry " + this.INVENTORY_AMOUNT + " bags")
        });
        this.coinsI = this.add.sprite(start + spacing, cameraCenterY, 'coins')
            // .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(12)
            .setInteractive()
        this.t2 = this.add.text(start + spacing, cameraCenterY - 10, 'Extra Coins', {
            fontFamily: '"m6x11plus"', fontSize: '6px', color: '#000000', resolution: 2
        }).setScrollFactor(0)
            .setDepth(12).setOrigin(0.5)
        // .setScale(itemWidth / this.add.sprite(0, 0, 'coins').width); // Scale to match the desired item width

        this.potion = this.add.sprite(start + spacing * 2, cameraCenterY, 'potion')
            // .setOrigin(0.5)
            .setScrollFactor(0)
            .setDepth(12)
            .setInteractive()
        this.t3 = this.add.text(start + spacing * 2, cameraCenterY - 10, 'More Speed', {
            fontFamily: '"m6x11plus"', fontSize: '6px', color: '#000000', resolution: 2
        }).setScrollFactor(0)
            .setDepth(12).setOrigin(0.5)
        this.potion.on('pointerdown', () => {
            if (this.coins == 0) return 
            this.speedMult = this.speedMult * 1.1
            this.coins = this.coins - 1
            this.updateEverything()
            this.updateInventoryDisplay()
            this.updateCoinsDisplay()
            // alert("Now you will move 10% faster")
        });
        // .setScale(itemWidth / this.add.sprite(0, 0, 'potion').width); // Scale to match the desired item widthcopnsty
        // Allow player to click on the coin to collect it
        this.coinsI.on('pointerdown', () => {
            if (this.coins == 0) return 
            this.coinsMultiplier = this.coinsMultiplier * 2
            this.coins = this.coins - 1
            this.updateEverything()

            this.updateInventoryDisplay()
            this.updateCoinsDisplay()

            // alert("Now you will earn " + this.coinsMultiplier + " coins per bag")
        });



        // Listen for click on the Close button to close the shop
        this.closeButton.on('pointerdown', () => {
            this.closeShop();
        });
    }
    
    
    closeShop() {
        // Destroy all shop elements to close the shop screen
        this.shopBackground.destroy();
        this.shopPanel.destroy();
        this.shopText.destroy();
        this.closeButton.destroy();
        this.coinsI.destroy();
        this.potion.destroy();
        this.back.destroy();
        this.t1.destroy();
        this.t2.destroy();
        this.t3.destroy();
        this.isShopOpen = false
    }
    checkProximity() {
        if (this.inventory.length >= this.INVENTORY_AMOUNT) return; // Don't check if the player already has the max bags
    
        this.placedBags.forEach(bag => {
            const distance = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, bag.x, bag.y
            );
            
            // If player is close to the bag (within 50px range), allow interaction
            if (distance < 50) {
                bag.setInteractive({ cursor: 'pointer' }); // Enable interaction
                
                // Check if the listener has already been added
                if (!bag.hasListener) {
                    bag.hasListener = true; // Set the flag
                    
                    bag.once('pointerdown', () => {
                        if(this.inventory.length >= this.INVENTORY_AMOUNT) return
                        this.inventory.push(1);
                        this.updateInventoryDisplay();
                        console.log("1");
                        
                        // Remove bag from the scene
                        bag.disableInteractive(); // Disable if too far
                        bag.destroy();
                        
                        console.log("2");
                        // Remove from bag array
                        this.placedBags = this.placedBags.filter(b => b !== bag);
                        // Drop a coin in the same place as the bag
                        this.createCoin(bag.x, bag.y+5);
                        // Provide feedback to player
                        const collectedText = this.add.text(this.player.x, this.player.y - 20, 'Bag collected!', {
                            fontFamily: '"m6x11plus"', fontSize: '10px', color: '#00ff00', resolution: 2
                        }).setOrigin(0.5);
                        console.log("3");
                        
                        // Remove both texts after a short delay
                        this.time.delayedCall(1000, () => {
                            collectedText.destroy();
                            console.log("5");
                        });
                        console.log("4");
                    });
                }
            } else {
                bag.disableInteractive(); // Disable if too far
            }
        });
    }
   
    addRandomBag() {
        // If all spots are taken, stop trying to place a new bag
        if (this.placedBags.length >= bags.length) {
            console.log('All spots are occupied. No more bags can be placed.');
            return;
        }
    
        let [x, y] = Phaser.Utils.Array.GetRandom(bags);
    
        // Check if there's already a bag at the selected (x, y) position
        const bagExists = this.placedBags.some(bag => bag.x === x && bag.y === y);
    
        // If a bag is already placed in this position, try again
        if (bagExists) {
            this.addRandomBag(); // Recursively call to get a new position
        } else {
            // Create a new bag sprite and add it to the bag group
            const bag = this.bagGroup.create(x, y, 'bag');
            this.placedBags.push(bag);
        }
    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        const speed = 80 + this.speedMult;
        let isMoving = false;
        this.checkProximityToDropZone();
        if (cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.setFlipX(true);
            isMoving = true;
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.setFlipX(false);
            isMoving = true;
        } else {
            this.player.setVelocityX(0);
        }
        if (this.going == "left") {
            this.player.setVelocityX(-speed);
            this.player.setFlipX(true);
            isMoving = true;
        } else if (this.going == "right") {
            this.player.setVelocityX(speed);
            this.player.setFlipX(false);
            isMoving = true;
        } else {
            this.player.setVelocityX(0);
        }

        if (cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            isMoving = true;
        } else if (cursors.down.isDown) {
            this.player.setVelocityY(speed);
            isMoving = true;
        } else {
            this.player.setVelocityY(0);
        }

        if (this.going == "up") {
            this.player.setVelocityY(-speed);
            isMoving = true;
        } else if (this.going == "down") {
            this.player.setVelocityY(speed);
            isMoving = true;
        } else {
            this.player.setVelocityY(0);
        }

        // Play the appropriate animation based on movement
        if (isMoving) {
            this.player.anims.play('playerWalking', true);
        } else {
            this.player.anims.play('playerIdle', true);
        }

        // this.cameras.main.startFollow(this.player);
        // this.cameras.main.setLerp(0.5, 0.5);
        // this.cameras.main.setBounds(-200, 20, 1500, 850);
        // this.cameras.main.setZoom(1.5, 1.5);

         // Set camera bounds to match the world size
         this.cameras.main.setBounds(0, 0, 512, 288);
         this.cameras.main.setZoom(2);
 
         // Set camera to follow the player
         this.cameras.main.startFollow(this.player);
         this.cameras.main.setLerp(0.5, 0.5);
         
    }

    addCollider(x, y, width, height) {
        const collider = this.colliders.create(x, y, null).setOrigin(0, 0).refreshBody().setVisible(true);
        collider.body.setSize(width, height);
    }
    // Create a coin under the collected bag
createCoin(x, y) {
    const coin = this.add.sprite(x, y, 'coin');
    coin.setInteractive({ cursor: 'pointer' });

    // Allow player to click on the coin to collect it
    coin.on('pointerdown', () => {
        this.coins += (1 * this.coinsMultiplier); // Add coin to player's inventory
        console.log("Coins: ", this.coins);

        // Provide feedback to player
        const coinCollectedText = this.add.text(this.player.x, this.player.y - 20, 'Coin collected!', {
            fontFamily: '"m6x11plus"', fontSize: '10px', color: '#ffd700', resolution: 2
        });
        this.updateEverything()

        // Remove coin from scene
        coin.destroy();
        this.updateCoinsDisplay()
        // Remove feedback text after a short delay
        this.time.delayedCall(1000, () => {
            coinCollectedText.destroy();
        });
    });
}
}

const container = document.getElementById('renderDiv');
const config = {
    parent: 'renderDiv',
    type: Phaser.AUTO,
    scene: [Menu, ChatScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 512,
        height: 288,
        // width: 1400,
        // height: 890,
    },
    dom: {
        createContainer: true
    },

    render: {
        pixelArt: true
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 },
        }
    },
    input: {
        keyboard: {
            capture: [37, 38, 39, 40] // Capture only arrow keys
        }
    }
};

window.phaserGame = new Phaser.Game(config);
function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    return isLandscape;
}

window.addEventListener("load", ()=> {
    const fullscreenButton = document.getElementById("fscreen")
    if(checkOrientation()) {

        fullscreenButton.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                window.phaserGame.scale.startFullscreen();
                fullscreenButton.style.display = "none"
                
            }
        });
    } else {
        alert("Please rotate your device to landscape mode to play the game")
        //reload window
        window.location.reload()
    
    }
})

class NPC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, characterDescription, animKey, startFrame, endFrame) {
        super(scene, x, y, key);

        this.scene = scene;
        this.characterDescription = characterDescription;

        scene.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.setInteractive();

        scene.add.existing(this);

        this.createAnimation(animKey, 0, 20);
    }

    createAnimation(animKey, startFrame, endFrame) {
        this.scene.anims.create({
            key: animKey,
            frames: this.scene.anims.generateFrameNumbers(this.texture.key, {
                start: startFrame,
                end: endFrame
            }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.play(animKey, true);
    }
}
