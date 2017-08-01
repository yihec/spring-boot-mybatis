package com.example.service;


import com.example.base.GenericService;
import com.example.model.User;

/**
 * 用户 业务 接口
 * 
 * @author
 * @since
 **/
public interface UserService extends GenericService<User, Long> {

    /**
     * 用户验证
     * 
     * @param user
     * @return
     */
    User authentication(User user);

    /**
     * 根据用户名查询用户
     * 
     * @param username
     * @return
     */
    User selectByUsername(String username);
}
