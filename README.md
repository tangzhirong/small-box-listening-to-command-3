# small-box-listening-to-command-3
听指令的小方块（3）

demo效果：
=============================

![image](https://github.com/tangzhirong/small-box-listening-to-command-3/blob/master/smallBox.png)

指令规则：
====================
    在输入框中允许输入如下指令，按下按钮后，使得正方形做相应动作
    移动不能超出格子空间
    GO：向蓝色边所面向的方向前进一格（一格等同于正方形的边长)
    TUN LEF：向左转（逆时针旋转90度）
    TUN RIG：向右转（顺时针旋转90度)
    TUN BAC：向右转（旋转180度）
    TRA LEF：向屏幕的左侧移动一格，方向不变
    TRA TOP：向屏幕的上面移动一格，方向不变
    TRA RIG：向屏幕的右侧移动一格，方向不变
    TRA BOT：向屏幕的下面移动一格，方向不变
    MOV LEF：方向转向屏幕左侧，并向屏幕的左侧移动一格
    MOV TOP：方向转向屏幕上面，向屏幕的上面移动一格
    MOV RIG：方向转向屏幕右侧，向屏幕的右侧移动一格
    MOV BOT：方向转向屏幕下面，向屏幕的下面移动一格
    GO 3：向当前方向前进三格
    TRA TOP 2：向屏幕上方平移两格
    MOV RIG 4：方向转向屏幕右侧，向屏幕的右侧移动四格
