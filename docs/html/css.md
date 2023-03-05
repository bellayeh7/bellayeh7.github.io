## 1. 子盒子在大盒子中沉底显示？

元素样式，gamebox为父盒子，land为子盒子

```css
#gamebox {
  width: 480px;
  height: 600px;
}
#land {
  width: 480px;
  height: height;
}
```

- 【方一】绝对定位

  ```css
  #gamebox {
    position: relative;
  }
  #land {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  ```

- 【方二】flex布局

  ```css
  #gamebox {
    display: flex;
    flex-direction: column-reverse;
  }
  ```

- 【方三】`margin-top: auto` 法

  ```css
  #gamebox {
    display: flex;
  }
  #land {
    margin-top: auto;
  }
  ```

- 【方四】`vertical-align: bottom; ` 法

  ```css
  #gamebox {
    display: table-cell;
    vertical-align: bottom;
  }
  ```




## 2. uniapp 自适应布局

###    [1] 自适应单位 upx和rpx

- 文章

  https://blog.csdn.net/seimeii/article/details/122729127

- 

###   [2] 在uniapp中使用rem（h5和wx小程序）

- 文章1

  https://www.jianshu.com/p/62e399f4aa2e

- 文章2

  https://blog.csdn.net/weixin_48495574/article/details/116017680#:~:text=%E8%A7%A3%E5%86%B3%E6%80%9D%E8%B7%AF%EF%BC%9Auni-app%E6%8F%90%E4%BE%9B%E4%BA%86%E5%8F%AF%E4%BB%A5%E8%AE%BE%E7%BD%AEhtml%E6%A0%87%E7%AD%BE%E5%AD%97%E4%BD%93%E7%9A%84%E7%BB%84%E4%BB%B6%20page-meta,%E5%8F%AF%E4%BB%A5%E5%8A%A8%E6%80%81%E6%B8%B2%E6%9F%93html%E5%AD%97%E4%BD%93%E5%A4%A7%E5%B0%8F%E4%BB%8E%E8%80%8C%E5%AE%9E%E7%8E%B0%E5%93%8D%E5%BA%94%E5%BC%8F%E5%B8%83%E5%B1%80%2C%E7%BB%84%E4%BB%B6%E8%AF%A6%E6%83%85%E8%AF%B7%E7%9C%8B%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3%EF%BC%9A%20https%3A%2F%2Funiapp.dcloud.io%2Fcomponent%2Fpage-meta
  
   

###   [3] 响应式总结

- https://www.csdn.net/tags/OtTaUg2sMjU1NzEtYmxvZwO0O0OO0O0O.html

### [4] 单位upx、rpx、vw、vh、px

- 文章

  https://blog.csdn.net/xialong_927/article/details/110119409

## 3. CSS响应式布局

- 文章

  http://c.biancheng.net/css3/responsive.html

- px、rpx、em、rem

  https://zhuanlan.zhihu.com/p/156940153

- `rpx = px * 750 / 设计稿宽度`

## 4. border-image相关属性

- 文章

  https://www.jianshu.com/p/6ca92208ae4f?u_atoken=e6df356b-7899-4436-b3a9-47e3b76da13d&u_asession=01EkIX53VThBJgK2jSSqYbRuTzegqYtJ9n_MD8hqCGdPGt_j0Ru8HxP7T0s0JzgyhiX0KNBwm7Lovlpxjd_P_q4JsKWYrT3W_NKPr8w6oU7K-F3YCJOsPnqpx7SWZiZLaSPpcarp92QKzyJKyYjREPlmBkFo3NEHBv0PZUm6pbxQU&u_asig=05FUa9PccxevrEVu1QzwZNJ1yL8I0if2TCXjOGsYO9LngEtcsJM5_OxkVdiDn4FhaB6LzGzsOENs7yd1_WAjdaj7b4aij3ibfSGZkVzLLhJ8kiKMlTf7nbesLZfw9D2nC-TuvvZ75U5_JYTtYhf70Hwn15b4ujiRhsLkfHKMCWd4r9JS7q8ZD7Xtz2Ly-b0kmuyAKRFSVJkkdwVUnyHAIJzb5XPuI7wS1jJ9KTP8V3ny_G-u3dkuyZh-cFwttMpLx5WPRPQyB_SKrj-61LB_f61u3h9VXwMyh6PgyDIVSG1W8zGvDc7GM_9xLYzQ_0_osNwT5k5B61pfZ7a7fKvxvU_fG4--QynUeJICo1vA5cC5i63Zn6iekP-9aPukmxHplFmWspDxyAEEo4kbsryBKb9Q&u_aref=u7JtBk300URamdLvjseUVno%2FaTI%3D

## 5. css实现垂直居中的7种方法

- 文章

  https://zhuanlan.zhihu.com/p/263417006

  - 设定行高（line-height）
  - 添加伪元素
  - calc动态计算
  - 使用表格或假装表格
  - transform
  - 绝对定位
  - 使用Flexbox

## 6. 多行溢出以符号显示

```js
.ellipis-text {
  overflow: hidden;
  word-break: break-all;  /* break-all(允许在单词内换行。) */
  text-overflow: ellipsis;  /* 超出部分省略号 */
  display: -webkit-box;  /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical;  /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2;  /** 显示的行数 **/
}
```

## 7. 圆角样式相关设置

- 文章

  https://blog.csdn.net/weixin_44296929/article/details/103402051

  >小标签之类的小设计
