module game.HelloWorld{
    export class MyGame extends gamep.GameCycler {

        protected cmdStartup(data){
            trace('2.MyGame...onReady()..with',data);
            this.proxy(gamep.AssetsLoaderProxy).loadAssets('preload');
            this.proxy(gamep.AssetsLoaderProxy).debug = true;
            //(<CameraProxy>this.proxy(CameraProxy)).lookat(new egret.Point(stageWidth(0.5),stageHeight(0.5)),1)
        }

    }
}